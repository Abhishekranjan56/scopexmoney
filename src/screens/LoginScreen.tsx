import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const LoginScreen: React.FC = () => {
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'AIzaSyBXdxzQm6lkY90Cwv7NQsD3lpG54JF7A24', 
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g., sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error(error);
      }
    }
  };

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    if (confirm) {
      try {
        await confirm.confirm(code);
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        <Button title="Sign in with Phone" onPress={() => signInWithPhoneNumber(phoneNumber)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Enter OTP:</Text>
      <OTPInputView
        style={{ width: '80%', height: 200 }}
        pinCount={6}
        code={code}
        onCodeChanged={setCode}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <TouchableOpacity style={styles.button} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000',
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

export default LoginScreen;
