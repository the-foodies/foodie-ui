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
export default function (dbLoc, fileName, file, callback) {
  const imageRef = storageRef.child(`images/${dbLoc}/${fileName}`);
  const uploadTask = imageRef.put(file);
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress, '% done');
      this.setState({
        uploadProgress: progress,
        uploadState: snapshot.state,
      });
    }, (err) => {
      this.setState({
        uploadState: 'error',
      });
      console.log(err.code);
    }, () => {
      console.log('successful upload');
      this.setState({
        uploadState: 'complete',
        imageURL: uploadTask.snapshot.downloadURL,
      });
      callback(uploadTask.snapshot.downloadURL);
    });
}
