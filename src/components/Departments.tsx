import  { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const departmentData = [

    
  {
    id: 1,
    name: 'customer_service',
    subDepartments: [
      { id: 1.1, name: 'support' },

      { id: 1.2, name: 'customer_success' },

    ],
  },
 
  {
    id: 2,
    name: 'design',
    subDepartments: [
      { id: 2.1, name: 'web_design' },

      { id: 2.2, name: 'product_design' },
      { id: 2.3, name: 'graphic_design' },
   

    ],
  },

];

const Departments = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggleExpand = (id: number) => {
    setExpanded(expanded.includes(id) ? expanded.filter(i => i !== id) : [...expanded, id]);
  };

  const handleToggleSelect = (id: number, parentId?: number) => {
    const isSelected = selected.includes(id);
    let newSelected = isSelected ? selected.filter(i => i !== id) : [...selected, id];

    if (parentId) {
      const parentSubDeps = departmentData.find(dep => dep.id === parentId)?.subDepartments.map(sub => sub.id) || [];
      const allSelected = parentSubDeps.every(subId => newSelected.includes(subId));

      newSelected = allSelected ? [...newSelected, parentId] : newSelected.filter(i => i !== parentId);
    } else {
      const subDeps = departmentData.find(dep => dep.id === id)?.subDepartments.map(sub => sub.id) || [];
      newSelected = isSelected ? newSelected.filter(i => !subDeps.includes(i)) : [...newSelected, ...subDeps];
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departmentData.map(department => (
        <div key={department.id}>
          <ListItem>
            <IconButton onClick={() => handleToggleExpand(department.id)}>
              {expanded.includes(department.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <Checkbox
              checked={selected.includes(department.id)}
              onChange={() => handleToggleSelect(department.id)}
            />
            <ListItemText primary={department.name} />
          </ListItem>
          {expanded.includes(department.id) && (
            <List component="div" disablePadding>
              {department.subDepartments.map(sub => (
                <ListItem key={sub.id} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={selected.includes(sub.id)}
                    onChange={() => handleToggleSelect(sub.id, department.id)}
                  />
                  <ListItemText primary={sub.name} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ))}
    </List>
  );
};

export default Departments;