import React, { useState, useEffect } from 'react';
import { Button, Switch,List, Card, Dropdown, Modal, Menu} from 'antd';
import styles from './cubed.module.css';
import { useSelector, useDispatch  } from 'react-redux';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { setInsideVisible } from '../moduleVisibilitySlice';
import { setSwitchValue, setButtonText } from '../appReducer';
import { fetchEmployees, deleteEmployee } from '../../../actions.js';


const { confirm } = Modal;

export default function Cubed() {

  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetchEmployees()
      .then(responseData => {
        setData(responseData);
        setOriginalData(responseData);
      })
      .catch(error => {
      });
  }, []);

  const handleDelete = (id) => {
    confirm({
      title: 'Tem certeza que deseja excluir este funcionário?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteEmployee(id)
          .then(() => {
            setData(prevData => prevData.filter(item => item.id !== id));
          })
          .catch(error => {
          });
      },
    });
  };

  const handleFilterActive = () => {
    const filteredData = originalData.filter(item => item.ativo);
    setData(filteredData);
  };

  const handleClearFilters = () => {
    setData(originalData);
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDelete(id)}>
        Excluir
      </Menu.Item>
    </Menu>
  );


    const dispatchApp = useDispatch();
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
        onClick={handleFilterActive}
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
        onClick={handleClearFilters}
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
             <div className={styles['underlevel']}>

             <Dropdown
  className={styles['underlevelbutton']}
  overlay={menu(item.id)}
  trigger={['click']}
>
  <Button
    icon={<EllipsisOutlined style={{ fontSize: '20px' }} />}
    style={{ fontSize: '16px', padding: '30px 15px' }}
  />
</Dropdown>
             </div>
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
