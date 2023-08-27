import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Button,
  List,
  Card,
  Row,
  Col,
  Checkbox
} from 'antd';
import styles from './inside.module.css';
import { useSelector, useDispatch  } from 'react-redux';
import { setInsideVisible } from '../moduleVisibilitySlice';
import axios from 'axios';

const { Item } = Form;
const { Option } = Select;

export default function Inside() {







  const [mainForm] = Form.useForm();
  const [activityForm] = Form.useForm();
  const [ativo, setAtivo] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [noEpi, setNoEpi] = useState(false); // Estado do Checkbox
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFormSubmit = async () => {
    try {
      const mainFormValues = await mainForm.validateFields();
      const activityFormValues = await activityForm.validateFields();

      const combinedFormData = {
        ...mainFormValues,
        ...activityFormValues,
        ativo: ativo,
        noEpi: isLocked,
        arquivo: selectedFile,
      };

      console.log('Valores combinados:', combinedFormData);

      // Envie os dados combinados para o servidor JSON usando o Axios
      const response = await axios.post('http://localhost:5000/employees', combinedFormData);
      console.log('Resposta do servidor:', response.data);

      // Limpe os campos dos formulários após o envio bem-sucedido
      mainForm.resetFields();
      activityForm.resetFields();
      dispatch(setInsideVisible(false));
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleLockChange = (e) => {
    setIsLocked(e.target.checked);
    if (!e.target.checked) {
      setNoEpi(false); // Reinicialize o estado do Checkbox ao desbloquear
    }
  };
  const handleSwitchChange = (checked) => {
    setAtivo(checked);
  };








  const dispatch = useDispatch();
  const insideVisible = useSelector(state => state.moduleVisibility.insideVisible);

  const [itemCount, setItemCount] = useState(1);
  const [showEpiInputs, setShowEpiInputs] = useState(Array(itemCount).fill(false));

  const resetFields = () => {
    setShowEpiInputs(Array(itemCount).fill(false));
  };

  const addItem = () => {
    if (!isLocked) {
      setItemCount(itemCount + 1);
      setShowEpiInputs([...showEpiInputs, false]);
    }
  };

  const toggleEpiInput = (index) => {
    if (!isLocked) {
      const updatedShowEpiInputs = showEpiInputs.map((value, i) => (i === index ? !value : value));
      setShowEpiInputs(updatedShowEpiInputs);
    }
  };


  const items = Array.from({ length: itemCount }).map((_, index) => ({
    id: index,
    title: `Item fictício ${index + 1}`,
    description: `Descrição do item fictício ${index + 1}`
  }));

  const textStyle = {
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal'
  };



  const switchStyle = {
    position: 'absolute',
    top: '11px',
    right: '12px'
  };

 
  const inputFileRef = React.createRef();

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className={styles.insidemain}>
      <div className={styles.insidetop}>
        <div className={styles.title2}>
          <p>Adicionar Funcionário</p>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '20px',
            transform: 'translateY(-50%)',
            fontSize: '27px',
            color: '#F2F2F2',
            cursor: 'pointer'
          }}
        >
          <ArrowLeftOutlined onClick={() => dispatch(setInsideVisible(false))}></ArrowLeftOutlined>
        </div>
      </div>
      <div className={styles.separador1}>
        <div className={styles['text-separador1']}>
          <p>O trabalhador está ativo ou inativo? </p>
        </div>
        <div style={switchStyle}>
          <Switch
            checked={ativo}
            onChange={handleSwitchChange}
            checkedChildren="Ativo"
            unCheckedChildren="Inativo"
          />
        </div>
      </div>
      <div className={styles.separador2}>
        <Form layout="vertical" className={styles.customForm} form={mainForm}>
          <div className={styles.columnContainer}>
            <div className={`${styles.column} ${styles.columnTopSpacing}`}>
              <div className={styles.fieldContainer}>
                <label className={styles.label}>Nome</label>
                <Item name="nome" rules={[{ required: true, message: '' }]} validateTrigger={['onChange', 'onBlur']}>
                  <Input className={styles.inputField} />
                </Item>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.label}>CPF</label>
                <Item name="cpf" rules={[{ required: true, message: '' }]} validateTrigger={['onChange', 'onBlur']}>
                  <Input className={styles.inputField} />
                </Item>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.label}>RG</label>
                <Item name="rg" rules={[{ required: true, message: '' }]} validateTrigger={['onChange', 'onBlur']}>
                  <Input className={styles.inputField} />
                </Item>
              </div>
            </div>
            <div className={`${styles.column} ${styles.columnTopSpacing}`}>
              <div className={styles.fieldContainer}>
                <label className={styles.label}>Sexo</label>
                <Item name="sexo" rules={[{ required: true, message: '' }]} validateTrigger={['onChange', 'onBlur']}>
                  <Radio.Group>
                    <Radio value="M">Masculino</Radio>
                    <Radio value="F">Feminino</Radio>
                  </Radio.Group>
                </Item>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.label}>Data de Nascimento</label>
                <Item
                  name="dataNasc"
                  rules={[{ required: true, message: '' }]}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input type="date" className={styles.inputField} />
                </Item>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.label}>Cargo</label>
                <Item name="cargo" rules={[{ required: true, message: '' }]} validateTrigger={['onChange', 'onBlur']}>
                  <Select className={styles.selectField}>
                    <Option value="gerente">Gerente</Option>
                    <Option value="analista">Analista</Option>
                    <Option value="assistente">Assistente</Option>
                  </Select>
                </Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className={styles.separador3}>
        <div className={styles['text-separador3']}>
          <p>EPIs do trabalhador?</p>
        </div>
        <div className={styles['scroll-bar']}>
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <List
              dataSource={items}
              renderItem={(item, index) => (
                <List.Item
                  key={item.id}
                  style={{
                    marginTop: index === 0 ? '68px' : '159px',
                    marginBottom: '68px'
                  }}
                >
                  <Card className={styles.customCard}>
                  <Form layout="vertical" form={activityForm}>
        <Form.Item
          name="atividade"
          label="Atividade"
          style={{ ...textStyle, marginBottom: '2px', marginTop:'-6px' }}
        >
          <Select
            placeholder="Selecione uma atividade"
            disabled={isLocked}
          >
            {/* Opções do select */}
            <option value="Atividade 1">Atividade 1</option>
            <option value="Atividade 2">Atividade 2</option>
            <option value="Atividade 3">Atividade 3</option>
          </Select>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="EPI"
              style={{ ...textStyle, marginTop: '4px' }}
              name="epi"
            >
              {showEpiInputs[index] ? (
                <Input
                  placeholder="EPI"
                  name="epi"
                  style={{ ...textStyle, width: '260px' }}
                  disabled={isLocked}
                />
              ) : (
                <Select
                  placeholder="Selecione um EPI"
                  style={{ ...textStyle, width: '260px' }}
                  disabled={isLocked}
                >
                  {/* Opções do select */}
                  <option value="Capacete">Capacete</option>
                  <option value="Abafador">Abafador</option>
                  <option value="Máscara">Máscara</option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col
            span={12}
            style={{ marginLeft: '-35px', marginTop: '4px' }}
          >
            <Form.Item label="CA" name="ca">
              <Input
                placeholder="Número do CA"
                style={{ ...textStyle, width: '260px' }}
                disabled={isLocked}
              />
              <Button
                type="text"
                onClick={() => toggleEpiInput(index)}
                disabled={isLocked}
              >
                Mudar EPI
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
        <Button className={styles.addatv} onClick={addItem} disabled={isLocked}>
          Adicionar outra atividade
        </Button>
        <Checkbox className={styles.checkbutton} onChange={handleLockChange} checked={isLocked}>
          O trabalhador não usa EPI.
        </Checkbox>
      </div>
      <div className={styles.separador4}>
        <div className={styles['text-separador4']}>
          <p>Atestado de Saúde Ocupacional:</p>
        </div>
        <div className={styles['archive-folder']}>
          <div className={styles['archive-texto']}>
            {selectedFile && <p>{selectedFile.name}</p>}
          </div>
        </div>
        <Button
          className={styles['button-style']}
          onClick={() => inputFileRef.current.click()}
        >
          Selecionar arquivo
        </Button>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
      </div>
      <Button className={styles.salvar} onClick={handleFormSubmit} >Salvar</Button>
      <div className={styles.space}></div>
    </div>
  );
}
