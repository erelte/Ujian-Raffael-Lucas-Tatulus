#include <stdio.h>

int main(){
	int a =0;
	printf("Masukan Angka:");
	scanf("%d", &a);
	int b = a*a;
	printf("%d\n",b);
	int i =0;
	 for (i = 0; i < a; ++i){
  	b = b-1;
    printf("%d ", b);
  	}
	printf("\n");
	int c=b;
	for(i=1;i<b; ++i){
	c = c-1;
	printf("%d ",c);	
	}

	
	return 0;
}
