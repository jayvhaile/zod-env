import {EnvSource} from "../env-source";

export class DotEnvFileSource implements EnvSource {
    constructor(private path: string = '.env') {
    }

    fetch() {
        return require('dotenv').config({path: this.path}).parsed || {}
    }
}