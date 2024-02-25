import { BaseRepository } from "@/app/repositories/BaseRepository";
import Image from "@file/models/Image";

export default class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image);
  }
}
