const PROXY_CONFIG = [
  {
    context: ['/api'],              // Define quais caminhos serão redirecionados
    target: 'http://localhost:8080', // URL do backend
    secure: false,                  // Permite proxy para servidores sem certificado SSL válido (útil em dev)
    logLevel: 'debug'               // Mostra detalhes no terminal sobre o redirecionamento
  }
];

module.exports = PROXY_CONFIG;


