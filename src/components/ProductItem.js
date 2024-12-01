import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllProducts } from '../database/database';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Carrega todos os produtos quando a tela for carregada
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AddProduct', { mode: 'edit', product: item })}>
      <View style={styles.productItem}>
        <Text>{item.name}</Text>
        <Text>{item.category}</Text>
        <Text>{item.size}</Text>
        <Text>{`Preço de Custo: R$${item.costPrice.toFixed(2)}`}</Text>
        <Text>{`Lucro: R$${item.profit.toFixed(2)}`}</Text>
        <Text>{`Quantidade: ${item.quantity}`}</Text>
        <Text>{`Quantidade Mínima: ${item.minQuantity}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Produto"
        onPress={() => navigation.navigate('AddProduct', { mode: 'add' })}
      />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default ProductsScreen;

