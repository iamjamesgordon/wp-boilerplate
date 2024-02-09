FROM wordpress:6.4.2

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN mv wp-cli.phar /usr/local/bin
RUN echo 'alias wp="wp-cli.phar --allow-root"' >> /root/.bashrc
RUN apt-get update
RUN apt install -y less