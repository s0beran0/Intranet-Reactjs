import React, { useState, useEffect } from 'react';
import { Button, Switch,List, Card } from 'antd';
import styles from './cubed.module.css';
import { useSelector, useDispatch  } from 'react-redux';
import { MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { setInsideVisible } from '../moduleVisibilitySlice';
import { setSwitchValue, setButtonText } from '../appReducer';
import axios from 'axios';





export default function Cubed() {



    const [data, setData] = useState([]);

    useEffect(() => {
      // Fazendo a requisição GET para o JSON-Server
      axios.get('http://localhost:5000/employees') // Substitua pela rota correta
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter os dados do servidor:', error);
        });
    }, []);





    const dispatchApp = useDispatch(); // Usando um nome diferente para evitar conflito
  const { switchValue, setButtonText } = useSelector(state => state.app);

    const dispatch = useDispatch();
    const insideVisible = useSelector(state => state.moduleVisibility.insideVisible);


    return (
        <div className={styles['cubed']}>
            <div className={styles['topped']}>
                <div className={styles['title1']}>
                    <p>Funcionário(s)</p>
                </div>
            </div>
                <Button onClick={() => dispatch(setInsideVisible(true))}
                    type="default"
                    style={{
                        position: 'absolute',
                        top: '90px',
                        width: '95%',
                        height: '60px',
                        left: '2.5%',
                        borderRadius: '10px',
                        border: '1px solid #4FA1C1',
                        background: 'transparent',
                        color: '#4FA1C1',
                    }}>
                
                    + Adicionar Funcionário
                </Button>
                <Button
                    type="default"
                    style={{
                        position: 'absolute',
                        top: '170px',
                        width: '192px',
                        left: '2.5%',
                        borderRadius: '10px',
                        border: '1px solid #4FA1C1',
                        background: 'transparent',
                        color: '#4FA1C1',
                        marginRight: '30px',
                    }}
                >
                    Ver apenas ativos
                </Button>
                <Button
                    type="default"
                    style={{
                        position: 'absolute',
                        top: '170px',
                        width: '192px',
                        left: '25%',
                        borderRadius: '10px',
                        border: '1px solid #4FA1C1',
                        background: 'transparent',
                        marginLeft: '30px',
                        color: '#4FA1C1',
                    }}
                >
                    Limpar Filtros
                </Button>


                

                <div className={styles['bda']}>
                <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
      <List
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            
            key={item.id}
            style={{
              backgroundColor: 'transparent',
              marginTop: index === 0 ? '-10px' : '-17px',
              marginBottom: '-17px'
            }}
          >
            <Card className={styles.nextlevel}>
             <div className={styles['underlevel']}></div>
              <p className={styles.nome}>{item.nome}</p>
              <p className={styles.cpf}>{item.cpf}</p>
              <p className={styles.ativo}>Ativ {item.ativo ? 'Sim' : 'Não'}</p>
              <p className={styles.cargo}>{item.cargo}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
                </div>
                    <Switch
                        className={styles.switch1}
                        onChange={(value) => dispatchApp(setSwitchValue(value))}
                        checked={switchValue}
                        checkedChildren={<span>Sim</span>}
                        unCheckedChildren={<span>Não</span>}
                    />
                    
                <div className={styles['etapa']}>
                    <p>A etapa está concluída?</p>
                </div>
            <Button className={styles.prox}>Próximo passo</Button>
        </div>
    );
}
