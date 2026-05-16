# Imagem base Python
FROM python:3.14-slim

# Informações
LABEL maintainer="gabriel"
LABEL description="Blog Assassins - Sistema de Blog"

# Diretório de trabalho
WORKDIR /app

# Copiar requirements e instalar dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo o código
COPY . .

# Expor porta 5000 (Flask padrão)
EXPOSE 5000

# Variáveis de ambiente
ENV FLASK_APP=back/app.py
ENV FLASK_ENV=development

# Comando para rodar
CMD ["python", "back/app.py"]