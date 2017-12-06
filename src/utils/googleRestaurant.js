const { google } = window;

export const googleAutocomplete = query => new Promise((resolve, reject) => {
  // query google
  const AutocompleteService = new google.maps.places.AutocompleteService();
  AutocompleteService.getPlacePredictions({ input: query }, (options = [], serviceStatus) => {
    if (serviceStatus === 'OK') {
      resolve(options);
    } else {
      resolve([]);
    }
  });
});

export const googleRestaurant = place => new Promise((resolve, reject) => {
  const PlacesService = new google.maps.places.PlacesService(document.createElement('div'));
  PlacesService.getDetails(place, (result, serviceStatus) => {
    if (serviceStatus === 'OK') {
      resolve(result);
    } else {
      resolve(false);
    }
  });
});
