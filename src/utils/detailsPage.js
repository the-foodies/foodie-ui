export const mapDetailsToCarouselFormat = obj => (
  obj.images.map(image => (
    {
      id: image.id,
      name: obj.name,
      description: obj.description,
      image_url: image.image_url,
    }
  )));

export const mapDetailsToHorizontalFormat = obj => (
  obj.foodItems.map(item => (
    {
      id: item.id,
      name: obj.name,
      description: item.description,
      image_url: obj.image_url,
    }
  )));
