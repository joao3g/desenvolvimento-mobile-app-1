import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaUsuario = ({ navigation }) => {
    const [usuarios, setUsuarios] = useState([]);

    const carregarDados = async () => {
        try {
            const jsonUsuarios = await AsyncStorage.getItem('users');
            
            const listaUsuarios = jsonUsuarios != null ? JSON.parse(jsonUsuarios) : [];

            setUsuarios(listaUsuarios);
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao carregar os usuários.');
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    return (
        <View style={styles.container}>
            {usuarios.length > 0 ? (
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.cpf}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Nome: {item.nome}</Text>
                            <Text style={styles.itemText}>E-mail: {item.email}</Text>
                            <Text style={styles.itemText}>CPF: {item.cpf}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.label}>Nenhum usuário cadastrado.</Text>
            )}
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
    },
    itemText: {
        fontSize: 18,
    },
});

export default ListaUsuario;
