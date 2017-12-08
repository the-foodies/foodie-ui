import { firebaseStorage } from '../auth';

const storageRef = firebaseStorage.ref();

/**
 *  dbLoc === 'restaurant' || 'recipe'
 *  file === file generated from input form
 *  fileName === example.jpg (must include extension)
 *  context === this
 *  callback
 *
 *  state values needed:
 *  {
 *    uploadProgress: <INT>,
 *    uploadState: <STRING>('complete', 'running', 'paused', 'error')
 *    imageUrl: <STRING>('https://firebasestorage.googleapis.com/...')
 *  }
 */
export default (dbLoc, fileName, file, context, callback) => {
  const imageRef = storageRef.child(`images/${dbLoc}/${fileName}`);
  const uploadTask = imageRef.put(file);
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress, '% done');
      context.setState({
        uploadProgress: progress,
        uploadState: snapshot.state,
      });
    }, (err) => {
      context.setState({
        uploadState: 'error',
      });
      console.log(err.code);
    }, () => {
      console.log('successful upload');
      context.setState({
        uploadState: 'complete',
        imageURL: uploadTask.snapshot.downloadURL,
      });
      callback(uploadTask.snapshot.downloadURL);
    });
};
