"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const db = __importStar(require("./db"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(app_1.default);
describe('Test request with mongoose', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.setTimeout(100000);
        yield db.connect();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.closeDatabase();
    }));
    test('get 0 products when databas empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/v1/products/');
        expect(res.statusCode).toBe(200);
        expect(res.body.products.length).toBe(0);
    }));
    test('get 1 product when 1 added', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: 'test',
            price: 200,
        };
        const res = yield request.post('/api/v1/products/').send(product);
        expect(res.statusCode).toBe(201);
        const productsRes = yield request.get('/api/v1/products/');
        expect(productsRes.body.products.length).toBe(1);
    }));
    test('get 2 product when 2 added', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: 'test',
            price: 200,
        };
        yield request.post('/api/v1/products/').send(product);
        yield request.post('/api/v1/products/').send(product);
        const productsRes = yield request.get('/api/v1/products/');
        expect(productsRes.body.products.length).toBe(2);
    }));
    test('delete one of two product, get single product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: 'test',
            price: 200,
        };
        const res = yield request.post('/api/v1/products/').send(product);
        const res1 = yield request.post('/api/v1/products/').send(product);
        yield request.delete('/api/v1/products/' + res.body.product._id);
        const productsRes = yield request.get('/api/v1/products/');
        const oneProductRes = yield request.get('/api/v1/products/' + res1.body.product._id);
        expect(productsRes.body.products.length).toBe(1);
        expect(oneProductRes.statusCode).toBe(200);
    }));
    test('update a product product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: 'test',
            price: 200,
        };
        const product1 = {
            name: 'updated',
        };
        const res = yield request.post('/api/v1/products/').send(product);
        yield request.put('/api/v1/products/' + res.body.product._id).send(product1);
        const oneProductRes = yield request.get('/api/v1/products/' + res.body.product._id);
        expect(oneProductRes.statusCode).toBe(200);
        expect(oneProductRes.body.name).toBe('updated');
    }));
});
//# sourceMappingURL=product.controller.test.js.map