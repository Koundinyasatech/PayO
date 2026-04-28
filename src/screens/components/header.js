import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../HomeScreen/homeStyling';

// export default function Header() {
//   return (
//     <View style={styles.header}>

//       {/* MENU */}
//       <TouchableOpacity>
//         <Icon name="menu" size={22} color="#fff" />
//       </TouchableOpacity>

//       {/* RIGHT SIDE */}
//       <View style={styles.headerRight}>

//         {/* NOTIFICATION */}
//         <TouchableOpacity>
//           <Icon name="bell" size={20} color="#fff" />
//         </TouchableOpacity>

//         {/* PROFILE */}
//         <TouchableOpacity style={styles.profileIcon}>
//           <Icon name="user" size={16} color="#000" />
//         </TouchableOpacity>

//       </View>

//     </View>
//   );
// }



export default function Header({ type = "default", title ,id}) {
  return (
    <View style={styles.header}>

      {/* LEFT SIDE */}
      {/* {type === "wallet" ? (
        <>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          {title || "Wallet"}
        </Text>
         <Text style={styles.walletNumber}>{id}</Text>
         </>
      ) : (
        <TouchableOpacity>
          <Icon name="menu" size={22} color="#fff" />
        </TouchableOpacity>
      )} */}

      {type === "wallet" ? (
  <View>
    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
      {title || "Wallet"}
    </Text>

    <Text style={styles.walletNumber}>{id}</Text>
  </View>
) : (
  <TouchableOpacity>
    <Icon name="menu" size={22} color="#fff" />
  </TouchableOpacity>
)}

      {/* RIGHT SIDE */}
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Icon name="bell" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileIcon}>
          <Icon name="user" size={16} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}