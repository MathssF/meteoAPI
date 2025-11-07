# Projeto Meteo-API

Este Projeto visa pegar as API do Meteomatics (https://www.meteomatics.com/en/weather-api/), e criar uma persistência própria, para poder ser posteriormente usada como Api.


## Estrutura

### Banco

O Banco de dados envolve algumas tabelas principais:

[b]Local[/b]: Localidades, com id, nome, latitude e longitude.

[b]Parameters[/b]: Diferentes parametros de medidas, como temperatura, visibilidade, precipitação, aptos para serem usados e checados.

[b]Measurement[/b]: A tabela que é o carro chefe! Ela é uma persistência que relembra todos os resultados anteriores.

[b]Schedule[/b]: Tabela que faz mediçoes agendadas, em dias da semana especificos ou em dias do mês, especificos.

[b]Alertas[/b]: Lembretes para quando uma localidade apresentar alguma medida de algum parametro maior ou menor que um certo valor. Para gerar assim alertas.

Além de outras tabelas secundárias.

### Api

Semelhante as tabelas temos:

[b]Local[/b]: Para adicionar registros, ou ver localidades registradas.

[b]Parameters[/b]: Para adicionar novos parametros nas buscas, ou verificar os já existentes.

[b]Measurement[/b]: A API mais importante. Ela pode tanto pesquisar e criar novos registros no banco de dados. Quanto mostrar todos que já aconteceram.

[b]Schedule[/b]: Adicionar uma agenda ou ver as agendas.

[b]Alertas[/b]: Adicionar um alerta ou ver os alertas.