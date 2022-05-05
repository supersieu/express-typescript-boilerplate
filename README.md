# Express-TypeScript-Boilerplate


## Configuration

### Env file
```ts
DATABASE_URL=DATABASE_URL
SECRET_KEY=SECRET_KEY
```

## Installation 

```ts
npm install
```

Launch : 

```ts
npm start
```
## Collections

### Users

```ts
type User = {
    id: number | string
    email: string
    password: string
    username: string
}

```

### Actuators

```ts
enum ActuatorType{
    BLINDS = "BLINDS",
    LIGHT = "LIGHT"
}

type Actuator = {
    id: number | string
    type: ActuatorType
    designation: string
    state: boolean
}
```

### Sensors

```ts
enum SensorType{
    TEMPERATURE = "TEMPERATURE",
    HUMIDITY = "HUMIDITY",
    BARO = "BARO",
    PROXIMITY = "PROXIMITY"
}

type Sensor = {
    id: number | string
    type: SensorType
    designation : string
    rawValue: number | boolean
}
```

## Interface 

```ts
type ApiResponse = {
    response: string
    data?: Record<string, any>
    error?: Error
}

```
## Endpoints

### Users

| METHOD | Route       | Query? | Body / Response                                  | Description |
| ------ | ----------- | ------ | ------------------------------------------------ | ----------- |
| GET    | /user       |        | UserGet[]                                        |             |
| GET    | /user/:id   |        | UserGet                                          |             |
| POST   | /user       |        | UserPost / {message: "created", id: number}      |             |
| POST   | /user/login |        | UserLogin  / {message: "success", token: string} |             |
| PATCH  | /user/:id   |        | UserUpdate                                       |             |
| DELETE | /user/:id   |        | N/A                                              |             |

### Actuators

| METHOD | Route         | Query? | Body / Response                                 | Description |
| ------ | ------------- | ------ | ----------------------------------------------- | ----------- |
| GET    | /actuator     | ?type  | Actuator[]                                      |             |
| GET    | /actuator/:id |        | Actuator                                        |             |
| POST   | /actuator     |        | ActuatorPost / {message: "created", id: number} |             |
| PATCH  | /actuator/:id |        | ActuatorUpdate                                  |             |
| DELETE | /actuator/:id |        | N/A                                             |             |

### Sensors

| METHOD | Route       | Query? | Body / Response                               | Description |
| ------ | ----------- | ------ | --------------------------------------------- | ----------- |
| GET    | /sensor     | ?type  | Sensor[]                                      |             |
| GET    | /sensor/:id |        | Sensor                                        |             |
| POST   | /sensor     |        | SensorPost / {message: "created", id: number} |             |
| PATCH  | /sensor/:id |        | SensorUpdate                                  |             |
| DELETE | /sensor/:id |        | N/A                                           |             |
