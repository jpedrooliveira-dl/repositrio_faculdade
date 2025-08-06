Vamos Exercitar?
Esta atividade tem como objetivo familiarizar o aluno com as ferramentas básicas de controle de versão usando Git e GitHub. O aluno aprenderá a criar um repositório no GitHub, adicionar um projeto a este repositório e fazer um commit das alterações realizadas.

Instruções:

1. Crie uma Conta no GitHub (se você ainda não tiver uma):

 Acesse [github.com] (https://github.com) e crie uma conta gratuita.
Preencha as informações necessárias e complete o processo de registro.
2. Instale o Git:

Baixe e instale o Git em seu computador, seguindo as instruções no site oficial: [git-scm.com](https://git-scm.com).
3. Configure o Git:

Abra o terminal ou prompt de comando e configure seu nome de usuário e e-mail do Git com os seguintes comandos:
git config --global user.name "Seu Nome"

git config --global user.email seuemail@example.com 

4. Crie um Novo Repositório no GitHub:

Acesse sua conta no GitHub.
Clique em "New repository" e crie um novo repositório com um nome apropriado.
Marque a opção para inicializar o repositório com um README. 
5. Clone o Repositório em sua Máquina Local:

 Copie o URL do repositório recém-criado.
 No terminal, navegue até o diretório onde deseja clonar o repositório e execute:   
git clone [URL do repositório] 
6. Adicione um Projeto ao Repositório:

Copie os arquivos do seu projeto para o diretório do repositório clonado.
No terminal, navegue até o diretório do repositório. 
7. Faça o Primeiro Committ:

 Adicione os arquivos ao Git com:
git add .
Faça o commit das alterações com uma mensagem descritiva:   
git commit -m “Primeiro commit: adicionando projeto ao repositório” 
8. Envie as Alterações para o GitHub:

Faça o push das alterações para o GitHub com:   
git push origin master  
