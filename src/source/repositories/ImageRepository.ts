import { BaseRepository } from "@app/repositories/BaseRepository";
import Image from "@source/models/Image";

export default class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image);
  }
}
