import {EnvSource} from "../env-source";

export class NodeProcessEnvSource implements EnvSource {
    fetch() {
        return process.env
    }
}