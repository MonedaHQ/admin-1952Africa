import { useQuery } from '@tanstack/react-query';
import { getProgramData } from '../../../services/apiProgram';

export function useProgramData(token) {
  const { isLoading, data: programData } = useQuery({
    queryKey: ['program-data'],
    queryFn: () => getProgramData(token),
  });

  return { isLoading, programData };
}
