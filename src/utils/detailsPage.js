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
      name: item.name,
      description: item.description,
      image_url: obj.image_url,
    }
  )));

export const changeToCarouselFormat = arr => (
  arr.map(item => (
    {
      id: item.id,
      name: item.name,
      description: item.Comments[0].text || 'no comments so far',
      image_url: item.ImagesRecipes[0].image_url || item.ImagesRestaurants[0].image_url,
    }
  )));
