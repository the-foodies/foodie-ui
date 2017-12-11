const mapDetailsToCarouselFormat = (obj) => {
  return [{
    name: obj.name,
    description: obj.name,
    id: obj.name,
    url: obj.imagesRecipes,
  }];
};

export default mapDetailsToCarouselFormat;
