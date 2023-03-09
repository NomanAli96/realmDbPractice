import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import realm, {
  getAllBooks,
  addBook,
  deleteAllBooks,
  updateAllBookEditions,
  getBigBooks,
  getAllAuthors,
  getAuthorById,
  addAuthor,
  deleteAllAuthors,
  getAvgPages,
  deletebyEdition,
} from './Database';

const App = () => {
  // Set initial states
  const [books, setBooks] = useState(getAllBooks());
  const [authors, setAuthors] = useState(getAllAuthors());
  //   console.log('books',books)
  // Render
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{padding: 16}}>
        {/* Our buttons for books */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{paddingTop: 8}}
            onPress={() => {
              // Create a book with random amount of pages and author by id 0. getAuthorById(0)[0]
              addBook(
                'Chronicles of JavaScript',
                Math.floor(Math.random() * 500),
                null,
              );
              setBooks(getAllBooks());
            }}>
            Add book
          </Text>

          <Text
            style={{paddingTop: 8}}
            onPress={() => {
              updateAllBookEditions();
              setBooks(getAllBooks());
            }}>
            Update edition
          </Text>

          <Text
            style={{paddingTop: 8}}
            onPress={() => {
              deleteAllBooks();
              setBooks(getAllBooks());
            }}>
            Delete all books
          </Text>
        </View>

        {/* List for all books */}
        <Text style={{marginTop: 8, fontWeight: 'bold'}}>Books</Text>
       
        <View style={{width: '100%', height: 100, backgroundColor: 'aqua'}}>
          {books?.map((item, index) => {
            console.log('🚀 ~ file: App.js:100 ~ App ~ item:', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  deletebyEdition(item);
                  setBooks(getAllBooks());
                }}
                key={index}
                style={{width: '100%'}}>
                <Text style={{color: '#000', fontSize: 18}}>
                  title:{item.title}
                </Text>
                <Text style={{color: '#000', fontSize: 18}}>
                  edition:{item.edition}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Divider */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#000000',
            height: 1,
            marginVertical: 8,
          }}
        />

        {/* Our buttons for authors */}
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{paddingTop: 8}}
            onPress={() => {
              addAuthor('FirstN', 'LastN');
              setBooks(getAllBooks());
            }}>
            Add author
          </Text>

          <Text
            style={{paddingTop: 8}}
            onPress={() => {
              deleteAllAuthors();
              setBooks(getAllBooks());
            }}>
            Delete all authors
          </Text>
        </View> */}

        {/* List for all authors */}
        {/* <Text style={{marginTop: 8, fontWeight: 'bold'}}>Authors</Text> */}
        {/* <FlatList
          data={authors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{item.id}</Text>
                <Text>{item.firstName + ' ' + item.lastName}</Text>
              </View>
            );
          }}
        /> */}
      </SafeAreaView>
    </>
  );
};

export default App;
