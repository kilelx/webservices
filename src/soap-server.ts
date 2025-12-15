import "dotenv/config"
import express from 'express';
import { productsService } from "./soap/services/products-service.soap";
import { authService } from "./soap/services/auth-service.soap";
import * as soap from "soap"
import fs from 'fs'
import path from 'path'

const server = express();

const port: number = Number(process.env.SOAP_PORT) ?? 4000;
const productsServiceWSDL: string = fs.readFileSync(path.resolve('src/soap/wsdl/ProductsService.wsdl'), "utf-8")
const authServiceWSDL: string = fs.readFileSync(path.resolve('src/soap/wsdl/AuthService.wsdl'), "utf-8")

server.listen(port, () => {
    soap.listen(server, '/soap/products', productsService, productsServiceWSDL);
    soap.listen(server, '/soap/auth', authService, authServiceWSDL);
    console.log(`Server SOAP is running on http://localhost:${port}`);
})
