import  { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';
import Departments from './Departments';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={posts}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
          />
        </div>
      )}
      <Typography variant="h4" gutterBottom>Departments</Typography>
      <Departments />
    </Container>
  );
};

export default SecondPage;