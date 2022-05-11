import { Card, Avatar, Input, Form, Button, notification, Divider, Tag, Alert } from 'antd';
import { RollbackOutlined, PlayCircleOutlined } from '@ant-design/icons';
import imcImg from "./assets/imc.jpg";
import { useState } from 'react';
import { render } from '@testing-library/react';
const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
};
const { Meta } = Card;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        lg: { span: 4 },
        xl: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        lg: { span: 20 },
        xl: { span: 20 },
    },
};

export function CardForm(){
    let [ weight, setWeight ] = useState(null);
    let [ height, setheight ] = useState(null);
    let [ result, setResult ] = useState(null);

    function calcImc(){
        if(weight === null || height === null){
            openNotificationWithIcon('warning', "Aviso", "O Peso e a Altura devem ser preenchidos !")
            return
        }else{

            let calcResult =  (parseFloat(weight) / (parseFloat(height) * (parseFloat(height) )))

            setWeight(null);
            setheight(null);
            setResult(calcResult)
            openNotificationWithIcon('success', "Resultado", "Resultado calculado com sucesso !")
        }
    }

    function renderAlert(){
        let type = "";
        let message = "";
        let description = "";
        
        if(result < 18.5){
            type = "info"
            message = "ABAIXO DO PESO"
            description = "Queda de cabelo, infertilidade e ausência menstrual"
        }else if(result > 18.6 && result < 24.99){
            type = "success"
            message = "PESO NORMAL"
            description = "Tudo OK"
        }else if(result > 25 && result < 29.99){
            type = "warning"
            message = "SOBREPESO"
            description = "Varizes, fadiga e problema vascular"
        }else if(result > 30 && result < 34.99){
            type = "warning"
            message = "OBESIDADE GRAU I"
            description = "Aterosclerose, infarto e diabetes"
        }else if(result > 35 && result < 39.99){
            type = "error"
            message = "OBESIDADE GRAU II"
            description = "Apneia do sono e falta de ar"
        }else if(result > 40){
            type = "error"
            message = "OBESIDADE GRAU III"
            description = "	Refluxo, AVC e dificuldade de locomoção"
        }

        return(
            <Alert
                style={{marginTop: 20 }}
                message={<strong>{message}</strong>}
                description={description}
                type={type}
            />
        )
    }

    return(
        <div
            style={{
                display: "flex", flexDirection: "column", alignContent: "center", 
                justifyContent: "center", position: "absolute", top: "0px", left: "0px",
                alignItems: "center", width: "100%", marginTop: "20%"
            }}
        >
            <Card
                style={{ width: 350 }}
                cover={
                    <img
                        alt="example"
                        src={imcImg}
                    />
                }
                bordered
                actions={[
                    <>
                        {result ?
                            <Button 
                                type="primary" 
                                icon={<RollbackOutlined style={{fontWeight: "bold"}}/>}
                                style={{ width: "90%", backgroundColor: "#f50", border: "none" }}
                                shape={"round"}
                                size="large"
                                onClick={() => setResult(null)}
                            >
                                Refazer
                            </Button>
                        : 
                            <Button 
                                type="primary" 
                                icon={<PlayCircleOutlined style={{fontWeight: "bold"}}/>}
                                style={{ width: "90%", backgroundColor: "#457750", border: "none" }}
                                shape={"round"}
                                size="large"
                                onClick={() => calcImc()}
                            >
                                Calcular
                            </Button>}
                    </>
                ]}
            >
                <Meta
                    avatar={
                        <Avatar 
                            src="https://joeschmoe.io/api/v1/random" 
                            size={30}
                        />
                    }
                    title="Avalie seu IMC"
                    //description="This is the description"
                    style={{marginBottom: "30px"}}
                />

                <Form.Item
                    hasFeedback
                    label="Peso"
                    {...formItemLayout} 
                >
                    <Input 
                        placeholder="Informe seu peso em KG" 
                        size="middle" 
                        onChange={e => setWeight(e.target.value.replace(/[^\d.-]/g, ''))}
                        value={weight}
                    />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    label="Altura"
                    {...formItemLayout} 
                >
                    <Input 
                        placeholder="Informe sua altura (metro e cm)" 
                        size="middle" 
                        onChange={e => setheight(e.target.value.replace(/[^\d.-]/g, ''))}
                        value={height}
                    />
                </Form.Item>

                {result ?
                    <div style={{ alignContent: "center", textAlign: "center" }}>
                        <Divider>Resultado</Divider>

                        <Tag 
                            color={"#108ee9"}
                            style={{fontSize: 25, padding: 10, borderRadius: "10%"}}
                        >
                            {result.toFixed(2)}
                        </Tag>

                        {renderAlert()}
                    </div>
                : null}

            </Card>
        </div>
    )
}