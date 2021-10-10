/**
 * @format
 */

import React from 'react';
import {View, Button, ActivityIndicator, Modal} from 'react-native';
import {Navigation} from 'react-native-navigation';

function SpinnerOverlay() {
  return (
    <Modal transparent>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'black',
          opacity: 0.5,
        }}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={'white'} />
      </View>
    </Modal>
  );
}

const Home = () => {
  const showModal1 = () => {
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
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Present Modal1" onPress={showModal1} />
    </View>
  );
};

const Modal1 = ({ componentId }) => {
  const repro = () => {
    Navigation.showOverlay({
      component: {
        id: 'spinner1',
        name: 'Spinner',
        options: {
          layout: {
            componentBackgroundColor: 'transparent',
            backgroundColor: 'transparent',
          },
        },
      },
    });

    setTimeout(() => {
      Navigation.dismissOverlay('spinner1');
      //Navigation.dismissModal(componentId); // This will correctly fire the event
      Navigation.dismissAllModals(); // But this does not
    }, 1000);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Reproduce Bug" onPress={() => repro()} />
    </View>
  );
};

Navigation.registerComponent('Spinner', () => SpinnerOverlay);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Modal1', () => Modal1);

Navigation.events().registerModalDismissedListener(event => {
  console.log('MODAL DISMISS:', event);
});

Navigation.events().registerAppLaunchedListener(() => {
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
