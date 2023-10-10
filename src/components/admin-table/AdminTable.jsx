
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Tag } from 'antd';
import RenderTag from '../render-tag/RenderTag';
import axios from 'axios';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    status: 'Active'
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Active'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Active'
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Inactive'
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Inactive'
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Active'
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 'Active'
  }
];


const UserTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("http://159.223.36.66:8080/customer/get-all-customer");
  //     const users = response.data;
  //     setUsers(users);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://159.223.36.66:8080/customer/get-all-customer");
      const users = response.data.map(user => ({
        ...user,
        roleName: user.accountDTO.roleDTO.roleName,
        email: user.accountDTO.email
      }));
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchUsers();
  },[]
  );
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters) & handleSearch(selectedKeys, confirm, dataIndex)& handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '20%',
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      width: '15%',
      ...getColumnSearchProps('roleName'),
      render: (roleName) => (
        <p style={{ textAlign: "center" }}>
          <RenderTag tagRender={roleName}/>
        </p>
      ),
      
      
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      ...getColumnSearchProps('status'),
      render: (status) => (
        <p style={{ textAlign: "center" }}>
          <RenderTag tagRender={status}/>
        </p>
      ),
      
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      ...getColumnSearchProps('phone'),
    },

    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   ...getColumnSearchProps('address'),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
    
  ];
  return <Table columns={columns} dataSource={users} />;
};
export default UserTable;