FROM docker.elastic.co/logstash/logstash:7.8.0

RUN rm -f /usr/share/logstash/pipeline/logstash.conf

ADD pipeline/ /usr/share/logstash/pipeline/
ADD config/ /usr/share/logstash/config/

RUN /usr/share/logstash/bin/logstash-plugin install logstash-filter-mutate

COPY ./postgresql-jdbc-connector-42.2.14.jar  /usr/share/logstash/logstash-core/lib/jars/posgresql-jdbc-connector.jar
