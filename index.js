/**
 * @format
 */

import React from 'react';
import {ActivityIndicator, Button, View} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';

const SpinnerOverlay: NavigationFunctionComponent = () => {
  setTimeout(() => {
    Navigation.dismissAllOverlays();
    Navigation.dismissAllModals(); // But this does not
  }, 2000);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={'white'} />
    </View>
  );
};

SpinnerOverlay.options = {
  layout: {
    componentBackgroundColor: '#00000050',
  },
  overlay: {
    interceptTouchOutside: false,
  },
};

function showSpinnerOverlay() {
  Navigation.showOverlay({
    component: {
      name: 'Spinner',
    },
  });
}

function showModal1() {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Modal1',
          },
        },
      ],
    },
  });
}

const Home = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Present Modal1" onPress={showModal1} />
    </View>
  );
};

const Modal1 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Reproduce Bug" onPress={showSpinnerOverlay} />
    </View>
  );
};

Navigation.registerComponent('Spinner', () => SpinnerOverlay);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Modal1', () => Modal1);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.dismissAllModals();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});

Navigation.events().registerModalDismissedListener(event => {
  console.log('MODAL DISMISS:', event);
});
