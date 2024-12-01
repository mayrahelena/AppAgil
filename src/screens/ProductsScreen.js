import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAllProducts } from '../database/database';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(); // Certifique-se de que 'getAllProducts' retorna corretamente os dados
        setProducts(data); // Atualiza o estado com os produtos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error); // Adicionei um log de erro caso haja falha na busca
      }
    };

    fetchProducts(); // Chama a função de busca dos produtos assim que a tela for montada

    // Adicionando listener para atualizar a lista quando a tela for focada
    const unsubscribe = navigation.addListener('focus', fetchProducts);
    return unsubscribe;
  }, [navigation]); // A dependência de 'navigation' permite que o efeito seja re-executado ao navegar entre as telas

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('AddProduct', { mode: 'edit', product: item })}
    >
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
      <Text>{item.size}</Text>
      <Text>Preço de Custo: R$ {item.costPrice.toFixed(2)}</Text>
      <Text>Lucro: R$ {item.profit.toFixed(2)}</Text>
      <Text>Quantidade: {item.quantity}</Text>
      <Text>Quantidade Mínima: {item.minQuantity}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct', { mode: 'add' })} />
      <FlatList
        data={products} // Passa a lista de produtos como 'data'
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Usando o 'id' para a chave
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default ProductsScreen;