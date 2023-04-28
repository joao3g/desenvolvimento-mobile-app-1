import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroUsuario = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    const salvarDados = async () => {
        const usuario = { nome, email, cpf }
        try {
            const storageData = await AsyncStorage.getItem('users')
            const users = storageData == null ? [] : JSON.parse(storageData)

            users.push(usuario)

            await AsyncStorage.setItem('users', JSON.stringify(users))
            alert('Usuário cadastrado com sucesso!')

            setNome('')
            setEmail('')
            setCpf('')
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao cadastrar o usuário.')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome do usuário"
            />
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite o e-mail do usuário"
                keyboardType="email-address"
            />
            <Text style={styles.label}>CPF:</Text>
            <TextInput
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
                placeholder="Digite o CPF do usuário"
                keyboardType="numeric"
            />
            <Button title="Salvar" onPress={salvarDados} />
            <Button title="Listar Usuários" onPress={() => navigation.navigate('ListUsers')} />
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
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        width: '100%',
        fontSize: 18,
    },
});

export default CadastroUsuario;
