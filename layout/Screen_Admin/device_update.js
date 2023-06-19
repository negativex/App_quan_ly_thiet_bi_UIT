import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ref, set, update } from "firebase/database";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import colors from "../colors/colors";
import { db } from "../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

const Device_update = ({ route }) => {
  const navigation= useNavigation();
  const [name, setName]= useState(route.params.item.Ten);
  const [type, setType] = useState(route.params.item.Loai);
   const [count, setCount] = useState(0);
  const addQuantity = () => setCount((prevCount) => prevCount + 1);
  const subtractQuantity = () => setCount((prevCount) => prevCount - 1);
  function create() {
    update(ref(db, "Thong tin thiet bi/" + name), {
      Ten: name,
      Loai: type,
      Soluong: count,
    })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: colors.blue,
          height: 80,
          padding: 10,
        }}
      >
        {/* go back button */}
        <TouchableOpacity
          style={{
            marginEnd: 340,
            margin: 10,
            marginTop: 30,
          }}
          onPress={() => navigation.navigate("device_list")}
        >
          <Image
            source={require("../images/back.png")}
            style={{
              width: 32,
              height: 32,
            }}
          ></Image>
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              marginTop: -40,
              fontWeight: "bold",
              fontSize: 22,
              color: "black",
            }}
          >
            Thêm Thiết Bị
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            height: 2,
            borderWidth: 1,
            borderColor: colors.deepblue,
            height: 220,
            margin: 10,
            borderRadius: 30,
          }}
        >
          <Image
            source={require("../images/addImage.png")}
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: 200,
              width: 200,
              alignSelf: "center",
            }}
          ></Image>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: colors["dark-light"],
            paddingHorizontal: 20,
            marginTop: 10,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity onPress={subtractQuantity}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              paddingHorizontal: 20,
              color: "white",
            }}
          >
            {count}
          </Text>

          <TouchableOpacity onPress={addQuantity}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ margin: 10 }}>
          <TextInput
            editable={true}
            selectTextOnFocus={true}
            placeholder="Nhập tên thiết bị..."
            style={styles.inputContainer}
            onChangeText={(name) => {
              setName(name);
            }}
            value={name}
          ></TextInput>
        </View>

        <View style={{ margin: 10 }}>
          <TextInput
            editable={true}
            selectTextOnFocus={true}
            placeholder="Nhập loại thiết bị..."
            style={styles.inputContainer}
            onChangeText={(type) => {
              setType(type);
            }}
            value={type}
          ></TextInput>
        </View>

        <View style={{ margin: 10 }}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "#000",
            }}
          >
            Thông số
          </TextInput>
        </View>

        <TextInput
          style={{
            color: "#000",
            margin: 10,
            height: 100,
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            paddingTop: -10,

            borderColor: colors.deepblue,
          }}
          placeholder="Nhập thông tin thiết bị..."
        ></TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress={create}>
          <Text style={styles.textButton}>Cập nhập</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default Device_update;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: "black",
  },
  inputContainer: {
    borderBottomColor: colors["white-smoke"],
    borderBottomWidth: 1,
    marginStart: 10,
    marginEnd: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: colors.deepblue,
    borderRadius: 20,
    paddingVertical: 10,
    margin: 10,
  },

  textButton: {
    marginStart: 10,
    marginEnd: 10,
    marginVertical: 10,
    color: "white",
    fontSize: 18,
    alignSelf: "center",
  },
});
