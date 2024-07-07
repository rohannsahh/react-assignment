import  { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const departmentData = [
  {
    id: 1,
    name: 'Department 1',
    subDepartments: [
      { id: 1.1, name: 'Sub Department 1.1' },
      { id: 1.2, name: 'Sub Department 1.2' },
      { id: 1.3, name: 'Sub Department 1.3' },

      { id: 1.4, name: 'Sub Department 1.4' },
      { id: 1.5, name: 'Sub Department 1.5' },

    ],
  },
  {
    id: 2,
    name: 'Department 2',
    subDepartments: [
      { id: 2.1, name: 'Sub Department 2.1' },

      { id: 2.2, name: 'Sub Department 2.2' },
      { id: 2.3, name: 'Sub Department 2.3' },
      { id: 2.4, name: 'Sub Department 2.4' },
      { id: 2.5, name: 'Sub Department 2.5' },

    ],
  },
  {
    id: 3,
    name: 'Department 3',
    subDepartments: [
      { id: 2.1, name: 'Sub Department 3.1' },

      { id: 2.2, name: 'Sub Department 3.2' },
      { id: 2.3, name: 'Sub Department 3.3' },
      { id: 2.4, name: 'Sub Department 3.4' },
      { id: 2.5, name: 'Sub Department 3.5' },

    ],
  },
  {
    id: 4,
    name: 'Department 4',
    subDepartments: [
      { id: 2.1, name: 'Sub Department 4.1' },

      { id: 2.2, name: 'Sub Department 4.2' },
      { id: 2.3, name: 'Sub Department 4.3' },
      { id: 2.4, name: 'Sub Department 4.4' },
      { id: 2.5, name: 'Sub Department 4.5' },

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