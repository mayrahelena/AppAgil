import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createTable } from './src/database/database'; // Função para criar a tabela no banco

// Importando as telas
import ProductsScreen from './src/screens/ProductsScreen';
import AddProductScreen from './src/screens/AddProductScreen';  

// Criando o stack navigator
const Stack = createNativeStackNavigator();

// App component
const App = () => {
  useEffect(() => {
    // Criar a tabela de produtos ao iniciar o app
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Adicionar / Editar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
