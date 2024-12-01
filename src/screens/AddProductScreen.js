import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addProduct, updateProduct } from '../database/database';

const AddProductScreen = ({ navigation, route }) => {
  const { mode, product } = route.params || {};
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Moda Praia');
  const [size, setSize] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [profit, setProfit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minQuantity, setMinQuantity] = useState('');

  useEffect(() => {
    if (mode === 'edit' && product) {
      setName(product.name);
      setCategory(product.category);
      setSize(product.size);
      setCostPrice(product.costPrice.toString());
      setProfit(product.profit.toString());
      setQuantity(product.quantity.toString());
      setMinQuantity(product.minQuantity.toString());
    }
  }, [mode, product]);

  const handleSave = () => {
    if (!name || !size || isNaN(costPrice) || isNaN(profit) || isNaN(quantity) || isNaN(minQuantity)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    const newProduct = {
      name,
      category,
      size,
      costPrice: parseFloat(costPrice) || 0,
      profit: parseFloat(profit) || 0,
      quantity: parseInt(quantity, 10) || 0,
      minQuantity: parseInt(minQuantity, 10) || 0,
    };
  
    if (mode === 'edit') {
      updateProduct({ ...newProduct, id: product.id }) // Adiciona o ID apenas no modo edição
        .then(() => {
          Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
          navigation.goBack();
        })
        .catch(() => Alert.alert('Erro', 'Falha ao atualizar o produto.'));
    } else {
      addProduct(newProduct) // ID não é necessário no modo "add"
        .then(() => {
          Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
          navigation.goBack();
        })
        .catch(() => Alert.alert('Erro', 'Falha ao adicionar o produto.'));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome do Produto" value={name} onChangeText={setName} style={styles.input} />
      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Moda Praia" value="Moda Praia" />
        <Picker.Item label="Moda Noturna" value="Moda Noturna" />
        <Picker.Item label="Moda Íntima" value="Moda Íntima" />
        <Picker.Item label="Produtos Eróticos" value="Produtos Eróticos" />
      </Picker>
      <TextInput placeholder="Tamanho" value={size} onChangeText={setSize} style={styles.input} />
      <TextInput placeholder="Preço de Custo" keyboardType="numeric" value={costPrice} onChangeText={setCostPrice} style={styles.input} />
      <TextInput placeholder="Lucro" keyboardType="numeric" value={profit} onChangeText={setProfit} style={styles.input} />
      <TextInput placeholder="Quantidade" keyboardType="numeric" value={quantity} onChangeText={setQuantity} style={styles.input} />
      <TextInput placeholder="Quantidade Mínima" keyboardType="numeric" value={minQuantity} onChangeText={setMinQuantity} style={styles.input} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddProductScreen;



