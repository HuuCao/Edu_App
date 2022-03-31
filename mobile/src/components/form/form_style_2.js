import React from "react"
import { View, TextInput, Text, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { ScaledSheet } from "react-native-size-matters"
import { THEME_COLOR } from "../../utils/themes"

const FormStyle2 = ({ listInput, labelStyle, labelSubmit, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <View>
      {listInput.map(item => {
        return (
          <View key={item.key}>
            <Text style={styles.label(labelStyle)}>{item.label}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name={item.name}
            />
          </View>
        )
      })}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.labelButton}>{labelSubmit || "OK"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = ScaledSheet.create({
  input: {
    width: "100%",
    height: "40@ms",
    borderBottomWidth: 1,
    paddingHorizontal: "5%",
    fontSize: "14@ms"
  },
  label: style => {
    return {
      fontSize: "14@ms",
      ...style,
    }
  },
  button: {
    width: "100%",
    height: "50@ms",
    backgroundColor: THEME_COLOR,
    marginTop: "10%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    fontSize: "17@ms",
    color: "white",
  },
})

export default FormStyle2
