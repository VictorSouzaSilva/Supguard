import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from './cadastro_login/tela_inicial';
import CriarConta from './cadastro_login/tela_cadastro';
import TelaLogin from './cadastro_login/tela_login';
import CompleteRegistro from './cadastro_login/complete_registro';
import Dashboard from './dashboard';
import TelaDenuncia from './tela_denuncia';
import TelaConfigPrincipal from './config_app/tela_config_principal';
import TelaConfigPermissoes from './config_app/tela_config_permissoes';
import TelaConfigNotificacoes from './config_app/tela_config_notificacoes';
import TelaContaPrincipal from './config_conta/tela_conta_principal';
import TelaInformacoesPessoais from './config_conta/tela_informacoes_pessoais';
import TelaSegurancaConta from './config_conta/tela_seguranca_conta';

const Stack = createStackNavigator();

export default function Navegacao() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaInicial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="CriarConta" component={CriarConta} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="CompleteRegistro" component={CompleteRegistro} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="TelaDenuncia" component={TelaDenuncia} />
        <Stack.Screen name="TelaConfigPrincipal" component={TelaConfigPrincipal} />
        <Stack.Screen name="TelaConfigPermissoes" component={TelaConfigPermissoes} />
        <Stack.Screen name="TelaConfigNotificacoes" component={TelaConfigNotificacoes} />
        <Stack.Screen name="TelaContaPrincipal" component={TelaContaPrincipal} />
        <Stack.Screen name="TelaInformacoesPessoais" component={TelaInformacoesPessoais} />
        <Stack.Screen name="TelaSegurancaConta" component={TelaSegurancaConta} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

