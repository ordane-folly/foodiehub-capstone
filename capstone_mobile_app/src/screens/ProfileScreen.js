import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { COLORS, shadow } from "../constants/theme";
import { storage } from "../services/storage";

export default function ProfileScreen({ user, onBack }) {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all([
      storage.getFavorites(),
      fetch("https://dummyjson.com/products?limit=20").then(r => r.json())
    ]).then(([ids, data]) => {
      setProducts((data.products || []).filter(p => ids.includes(p.id)));
      setFavorites(ids);
    });
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={onBack}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        <Text style={styles.title}>Mon profil</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user.username[0].toUpperCase()}</Text></View>
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Text style={styles.section}>Mes favoris ({favorites.length})</Text>
      {products.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>Aucun favori pour le moment.</Text></View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={p => String(p.id)}
          renderItem={({item}) => (
            <View style={styles.favorite}>
              <Image source={{uri:item.thumbnail}} style={styles.thumb}/>
              <View style={{flex:1}}>
                <Text style={styles.product} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <Text style={styles.heart}>♥</Text>
            </View>
          )}
          contentContainerStyle={{gap:10}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page:{flex:1,backgroundColor:COLORS.background,padding:18,paddingTop:48},
  header:{flexDirection:"row",alignItems:"center",gap:14,marginBottom:20},
  back:{width:42,height:42,borderRadius:13,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},
  backText:{fontSize:35,lineHeight:35}, title:{fontSize:25,fontWeight:"900",color:COLORS.text},
  card:{backgroundColor:"#fff",borderRadius:20,padding:22,alignItems:"center",...shadow},
  avatar:{width:72,height:72,borderRadius:36,backgroundColor:COLORS.primary,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#fff",fontSize:28,fontWeight:"900"},name:{fontSize:20,fontWeight:"900",marginTop:10,color:COLORS.text},email:{color:COLORS.muted,marginTop:4},
  section:{fontSize:15,fontWeight:"900",color:COLORS.text,marginVertical:18},
  empty:{backgroundColor:"#fff",borderRadius:17,padding:20},emptyText:{color:COLORS.muted},
  favorite:{backgroundColor:"#fff",borderRadius:16,padding:10,flexDirection:"row",alignItems:"center",gap:12,...shadow},
  thumb:{width:62,height:62,borderRadius:12},product:{fontWeight:"800",color:COLORS.text},price:{fontWeight:"900",marginTop:5},heart:{fontSize:22,color:COLORS.favorite}
});
