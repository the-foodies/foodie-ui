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

export const changeRecipeToCarouselFormat = arr => (
  arr.map(item => (
    {
      id: item.id,
      name: item.name,
      description: item.Comments[0].text,
      image_url: item.ImagesRecipes[0].image_url,
    }
  )));

export const changeRestToCarouselFormat = arr => (
  arr.map(item => (
    {
      id: item.id,
      name: item.name,
      description: item.Comments[0].text,
      image_url: item.ImagesRestaurants[0].image_url,
    }
  )));

export const changeAllToCarouselFormat = arr => (
  arr.map((item) => {
    let imageUrl;
    let type;
    if (item.ImagesRestaurants) {
      type = 'restaurant';
      imageUrl = item.ImagesRestaurants[0].image_url;
    } else {
      type = 'recipe';
      imageUrl = item.ImagesRecipes[0].image_url;
    }
    return {
      id: item.id,
      name: item.name,
      description: item.Comments[0].text,
      type,
      url: imageUrl,
      image_url: imageUrl,
    };
  }));
