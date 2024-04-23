

CREATE OR REPLACE VIEW clientView
AS SELECT c.*, i.dni, i.address,i.phone, i.email, i.birthdate, i.gender, i.country, i.type, i.note
FROM clients c LEFT JOIN infos i ON c.infoId=i.id;

CREATE OR REPLACE VIEW contactView
AS SELECT c.*, i.dni, i.address,i.phone, i.email, i.birthdate, i.gender, i.country, i.type, i.note
FROM contacts c LEFT JOIN infos i ON c.infoId=i.id;

CREATE OR REPLACE VIEW lawyerView
AS SELECT l.*, i.dni, i.address,i.phone, i.email, i.birthdate, i.gender, i.country, i.type, i.note
FROM lawyers l LEFT JOIN infos i ON l.infoId=i.id;

CREATE OR REPLACE VIEW jobView
AS SELECT j.*, i.dni, i.address,i.phone, i.email, i.birthdate, i.gender, i.country, i.type, i.note
FROM jobs j LEFT JOIN infos i ON j.infoId=i.id;

CREATE OR REPLACE VIEW amortizationView AS
SELECT amort.*, DATE_ADD(amort.date, INTERVAL cond.grace DAY) as expiresAt,
cond.initTerm, cond.initRateMora, cond.finalRateMora, cond.grace, cond.rate
FROM amortizations amort LEFT JOIN conditions cond ON amort.loanId=cond.loanId;

CREATE OR REPLACE VIEW userview AS SELECT a.id, a.name, a.lastname, a.username, a.email, a.lastlogin, a.infoId, a.verifiedAt,
i.dni, i.phone, i.birthdate, i.address, i.gender, i.country, i.createdBy, i.updatedBy,
i.updatedAt, i.createdAt, i.deletedAt, i.note, i.type
FROM `infos` i INNER JOIN `sigpres_main`.`auths` a ON a.infoId=i.id;

CREATE OR REPLACE VIEW clientContactView
AS SELECT con.id, con.name, con.lastname, con.infoId, con.type, con.note, con.createdBy, con.updatedBy, con.createdAt,
 con.updatedAt, con.dni, con.address, con.phone, con.email,con.birthdate, con.gender, con.country,
 cc.clientId, cc.contactId, cc.isGarante, cc.relationship, cc.id as relationId, cc.deletedAt as deletedAt
    FROM contactView con LEFT JOIN client_contacts cc ON cc.contactId=con.id;


CREATE OR REPLACE VIEW paymentStatView AS
SELECT ANY_VALUE(pay.id) AS id, ANY_VALUE(l.code) AS loanCode, pay.clientId , pay.loanId,
ROUND(AVG(DATEDIFF(m.closedAt, m.dueAt)),2) AS averageDiffInDay,
ROUND(COUNT(IF(DATEDIFF(pay.payedAt, pay.dueAt)<=0,pay.id,NULL)),2) AS onTime,
ROUND(COUNT(IF(DATEDIFF(pay.payedAt, pay.dueAt)>0,pay.id,NULL)),2) AS outTime,
(SELECT ANY_VALUE(w.name) ORDER BY COUNT(w.id) DESC LIMIT 1) AS modaWallet,
ROUND(AVG(IF(pay.interest=0,pay.capital,0)),2) AS averageAbonoCapital,
ROUND(SUM(IF(pay.interest=0,pay.capital,0)),2) AS totalAbonoCapital,
ROUND(SUM(IF(pay.interest>0,pay.capital,0)),2) AS totalCapitalOnCuota,
ROUND(SUM(pay.capital),2) AS totalCapital,
ROUND(SUM(pay.interest),2) AS totalInterest,
ROUND(SUM(pay.amount),2) AS totalAmount,
ROUND(SUM(IF(m.status='Cobrada',m.initAmount,0)),2) AS initialMora,
ROUND(SUM(IF(m.status='Cobrada',m.lateAmount,0)),2) AS finalMora,
ROUND(SUM(IF(m.status='Cobrada',m.initAmount+m.lateAmount,0)),2) AS mora,
ROUND(l.amount,2) AS loanAmount, ROUND(l.balance,2) AS loanBalance
FROM `payments` pay LEFT JOIN `wallets` w ON pay.walletId=w.id
LEFT JOIN `moras` m ON m.paymentId=pay.id
LEFT JOIN `loans` l ON pay.loanId=l.id
GROUP BY  pay.clientId, pay.loanId;


