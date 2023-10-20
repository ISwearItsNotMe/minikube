import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultURL = process.env.REACT_APP_BASE_URL;
export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(defaultURL + url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    let result = await axios.post(defaultURL + url, data, {
      withCredentials: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const putData = async (url: string, data: any) => {
  try {
    await axios.put(defaultURL + url, data, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    await axios.put(defaultURL + url, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export default function useDocumentTitle(title: string) {
  const location = useLocation();

  useEffect(() => {
    document.title = `MiniKube Recipes - ${title}`;
  }, [title, location]);
}
