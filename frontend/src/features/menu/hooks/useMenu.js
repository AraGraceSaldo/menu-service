import { useEffect, useState } from 'react';
import * as menuApi from '../api/menuApi';

export default function useMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await menuApi.getAllMenuItems();
      setItems(res.data ?? []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const res = await menuApi.createMenuItem(item);
      setItems((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, item) => {
    setLoading(true);
    setError(null);
    try {
      await menuApi.updateMenuItem(id, item);
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await menuApi.deleteMenuItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return { items, loading, error, loadAll, create, update, remove };
}

