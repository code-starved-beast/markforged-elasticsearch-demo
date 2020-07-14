# Markforged Interview Presentation

## Preface

+ In the old version of our app, all searchable entities were being loaded into the browser and searched through locally
+ this was extremely slow for large productions with 1000s of props/costume items/etc
+ needed to scale this up by using a server-side solution instead

## Why ElasticSearch?

+ rather than relational db table with text index, is optimized for advanced, configurable text-based search
+ performs basic NLP stuff like tokenization, fuzzy matching, stop word removal
+ easy to create an instance locally to work with in docker AND deploy on AWS

## The Problems

1. need to continually sync primary relation db with elasticsearch cluster
2. need to translate our relational data model into a NoSQL format that will allow search by related entites (e.g. character name on changes)

## Problem 1 Solution Path

+ was going to put syncing logic in data access layer of new app
+ realized that was bad b/c we had two apps writing to the db
+ needed to watch db directly

### First solution (not optimal)

+ created tables searchable_entity_upserts and searchable_entity_deletions which stored names of tables needing to be synced, along with timestamp of most recent scan
+ use recurring queue to perform table syncing job every 15 seconds
+ scan the watched tables and pick out all entities with an updated_at timestamp > last_upsert_check, use nodejs es cline to perform bulk update in batches
+ not optimal b/c upserts are expensive and doesn't take into account the health of the ES cluster

### Second Solution (WIP)

+ use logstash, which was designed to put data into ES
+ logstash takes input from a variety of sources, transforms it in some way, and outputs it to a variety of destinations
+ monitors health of elasticsearch cluster and slows down as needed
+ highly durable compared to homebrewed recurring queue, divorces syncing logic from application server
