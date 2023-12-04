import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';

type Option = {
  id: string;
  answer: string;
};

type User = {
  name: string;
  avatar: string;
};

type Content = {
  type: string;
  id: number;
  playlist: string;
  description: string;
  question: string;
  image: string;
  options: Option[];
  user: User;
};

const initialContent: Content = {
  type: '',
  id: -1,
  playlist: '',
  description: '',
  question: '',
  image: '',
  options: [],
  user: {name: '', avatar: ''},
};

function useContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState<Array<Content>>([]);

  useEffect(() => {
    getNext();
    getNext();
  }, []);

  const getNext = useCallback(async () => {
    try {
      setError('');
      setIsLoading(true);
      const result = await axios.get(
        'https://cross-platform.rp.devfactory.com/for_you',
      );
      setContent(prev => [...prev, result.data]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    content,
    getNext,
  };
}

export default useContent;
export type {Option, User, Content};
