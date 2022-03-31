import React from "react"
import { Text, View, TextInput, PixelRatio } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { THEME_COLOR,PRIMARY_COLOR } from "../../utils/themes"
import { ScaledSheet } from "react-native-size-matters"

const Form_1 = ({ listInput }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => console.log(data)
 
  return (
    <View style={styles.container}>
      {listInput.map(item => {
        return (
          <Controller
            key={item.key}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text style={styles.labelForm}>{item.label}</Text>
                <TextInput
                  placeholder={item.placeholder}
                  secureTextEntry={item.secureTextEntry}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              </View>
            )}
            name={item.name}
          />
        )
      })}
    </View>
  )
}

export default Form_1

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    width: "100%",
    height: "40@ms",
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: "5%",
    fontSize: "17@ms",
  },
  labelForm: {
    fontSize: "15@ms",
    color: THEME_COLOR,
    marginBottom: 5
  }
})
