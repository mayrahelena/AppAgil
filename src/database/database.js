import SQLite from 'react-native-sqlite-storage';

// Abre ou cria o banco de dados
const openDatabase = () => {
  try {
    return SQLite.openDatabase({ name: 'products.db', location: 'default' });
  } catch (error) {
    console.error('Erro ao abrir banco de dados:', error);
    return null;
  }
};

// Função para criar a tabela de produtos
const createTable = () => {
  const db = openDatabase();
  if (db) {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          size TEXT,
          costPrice REAL CHECK(costPrice >= 0),
          profit REAL CHECK(profit >= 0),
          quantity INTEGER CHECK(quantity >= 0),
          minQuantity INTEGER CHECK(minQuantity >= 0)
        )`,
        [],
        () => console.log('Tabela criada com sucesso.'),
        (error) => console.error('Erro ao criar tabela:', error)
      );
    });
  }
};

// Função para adicionar um produto
const addProduct = (product) => {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO products (name, category, size, costPrice, profit, quantity, minQuantity)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.category,
          product.size,
          product.costPrice,
          product.profit,
          product.quantity,
          product.minQuantity,
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Função para obter todos os produtos
const getAllProducts = () => {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT 
          id AS id, 
          name AS name, 
          category AS category, 
          size AS size, 
          costPrice AS costPrice, 
          profit AS profit, 
          quantity AS quantity, 
          minQuantity AS minQuantity 
        FROM products`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Função para atualizar um produto
const updateProduct = (product) => {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE products 
         SET name = ?, category = ?, size = ?, costPrice = ?, profit = ?, quantity = ?, minQuantity = ?
         WHERE id = ?`,
        [
          product.name,
          product.category,
          product.size,
          product.costPrice,
          product.profit,
          product.quantity,
          product.minQuantity,
          product.id,
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Dados fictícios
const sampleProducts = [
  { name: 'Produto 1', category: 'Categoria A', size: 'M', costPrice: 10.5, profit: 5.5, quantity: 20, minQuantity: 5 },
  { name: 'Produto 2', category: 'Categoria B', size: 'G', costPrice: 15.0, profit: 7.0, quantity: 15, minQuantity: 3 },
  { name: 'Produto 3', category: 'Categoria A', size: 'P', costPrice: 8.0, profit: 4.0, quantity: 10, minQuantity: 2 },
  { name: 'Produto 4', category: 'Categoria C', size: 'M', costPrice: 12.5, profit: 6.5, quantity: 8, minQuantity: 2 },
  { name: 'Produto 5', category: 'Categoria A', size: 'G', costPrice: 20.0, profit: 10.0, quantity: 5, minQuantity: 1 },
  { name: 'Produto 6', category: 'Categoria B', size: 'P', costPrice: 9.5, profit: 3.5, quantity: 12, minQuantity: 3 },
  { name: 'Produto 7', category: 'Categoria C', size: 'M', costPrice: 18.0, profit: 8.0, quantity: 6, minQuantity: 2 },
  { name: 'Produto 8', category: 'Categoria A', size: 'G', costPrice: 25.0, profit: 12.0, quantity: 7, minQuantity: 2 },
  { name: 'Produto 9', category: 'Categoria B', size: 'P', costPrice: 11.0, profit: 5.0, quantity: 9, minQuantity: 3 },
  { name: 'Produto 10', category: 'Categoria C', size: 'G', costPrice: 30.0, profit: 15.0, quantity: 3, minQuantity: 1 },
];

// Inserir dados fictícios no banco
const insertSampleProducts = async () => {
  try {
    const db = openDatabase();
    if (db) {
      for (const product of sampleProducts) {
        await addProduct(product);
      }
      console.log('Dados fictícios inseridos com sucesso.');
    }
  } catch (error) {
    console.error('Erro ao inserir dados fictícios:', error);
  }
};

// Função para inspecionar o banco de dados
const inspectDatabase = () => {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM products`,
      [],
      (_, { rows }) => {
        console.log('Dados no banco:', rows._array);
      },
      (_, error) => console.error('Erro ao inspecionar banco:', error)
    );
  });
};

// Inicialização do banco de dados
const initializeDatabase = async () => {
  try {
    createTable();
    await insertSampleProducts();
    inspectDatabase(); // Adicionado para inspecionar o banco
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
};

// Inicializa o banco de dados
initializeDatabase();



export { createTable, addProduct, getAllProducts, updateProduct };