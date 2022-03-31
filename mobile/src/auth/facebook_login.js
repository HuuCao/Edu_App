import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

export async function onFacebookButtonPress() {
  // Attempt login with permissions
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ' +
            result.grantedPermissions.toString(),
        );
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
}
