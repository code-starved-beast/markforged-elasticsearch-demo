import { Client } from '@elastic/elasticsearch';

declare global {
    namespace Express {
		export interface Application {
			esClient: Client;
		}
    }
}