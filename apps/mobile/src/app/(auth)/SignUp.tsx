import { View, Text } from 'react-native'
import { Link } from 'expo-router'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/(auth)/SignIn">Go to Sign in</Link>
    </View>
  )
}

export default SignUp